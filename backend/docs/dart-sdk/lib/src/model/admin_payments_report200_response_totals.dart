//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_payments_report200_response_totals.g.dart';

/// AdminPaymentsReport200ResponseTotals
///
/// Properties:
/// * [count] 
/// * [amountUsd] 
@BuiltValue()
abstract class AdminPaymentsReport200ResponseTotals implements Built<AdminPaymentsReport200ResponseTotals, AdminPaymentsReport200ResponseTotalsBuilder> {
  @BuiltValueField(wireName: r'count')
  int? get count;

  @BuiltValueField(wireName: r'amountUsd')
  num? get amountUsd;

  AdminPaymentsReport200ResponseTotals._();

  factory AdminPaymentsReport200ResponseTotals([void updates(AdminPaymentsReport200ResponseTotalsBuilder b)]) = _$AdminPaymentsReport200ResponseTotals;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminPaymentsReport200ResponseTotalsBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminPaymentsReport200ResponseTotals> get serializer => _$AdminPaymentsReport200ResponseTotalsSerializer();
}

class _$AdminPaymentsReport200ResponseTotalsSerializer implements PrimitiveSerializer<AdminPaymentsReport200ResponseTotals> {
  @override
  final Iterable<Type> types = const [AdminPaymentsReport200ResponseTotals, _$AdminPaymentsReport200ResponseTotals];

  @override
  final String wireName = r'AdminPaymentsReport200ResponseTotals';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminPaymentsReport200ResponseTotals object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.count != null) {
      yield r'count';
      yield serializers.serialize(
        object.count,
        specifiedType: const FullType(int),
      );
    }
    if (object.amountUsd != null) {
      yield r'amountUsd';
      yield serializers.serialize(
        object.amountUsd,
        specifiedType: const FullType(num),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AdminPaymentsReport200ResponseTotals object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminPaymentsReport200ResponseTotalsBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'count':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.count = valueDes;
          break;
        case r'amountUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.amountUsd = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AdminPaymentsReport200ResponseTotals deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminPaymentsReport200ResponseTotalsBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

