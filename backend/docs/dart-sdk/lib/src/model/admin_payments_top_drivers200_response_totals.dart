//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_payments_top_drivers200_response_totals.g.dart';

/// AdminPaymentsTopDrivers200ResponseTotals
///
/// Properties:
/// * [trips] 
/// * [amountUsd] 
@BuiltValue()
abstract class AdminPaymentsTopDrivers200ResponseTotals implements Built<AdminPaymentsTopDrivers200ResponseTotals, AdminPaymentsTopDrivers200ResponseTotalsBuilder> {
  @BuiltValueField(wireName: r'trips')
  int? get trips;

  @BuiltValueField(wireName: r'amountUsd')
  num? get amountUsd;

  AdminPaymentsTopDrivers200ResponseTotals._();

  factory AdminPaymentsTopDrivers200ResponseTotals([void updates(AdminPaymentsTopDrivers200ResponseTotalsBuilder b)]) = _$AdminPaymentsTopDrivers200ResponseTotals;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminPaymentsTopDrivers200ResponseTotalsBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminPaymentsTopDrivers200ResponseTotals> get serializer => _$AdminPaymentsTopDrivers200ResponseTotalsSerializer();
}

class _$AdminPaymentsTopDrivers200ResponseTotalsSerializer implements PrimitiveSerializer<AdminPaymentsTopDrivers200ResponseTotals> {
  @override
  final Iterable<Type> types = const [AdminPaymentsTopDrivers200ResponseTotals, _$AdminPaymentsTopDrivers200ResponseTotals];

  @override
  final String wireName = r'AdminPaymentsTopDrivers200ResponseTotals';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminPaymentsTopDrivers200ResponseTotals object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.trips != null) {
      yield r'trips';
      yield serializers.serialize(
        object.trips,
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
    AdminPaymentsTopDrivers200ResponseTotals object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminPaymentsTopDrivers200ResponseTotalsBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'trips':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.trips = valueDes;
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
  AdminPaymentsTopDrivers200ResponseTotals deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminPaymentsTopDrivers200ResponseTotalsBuilder();
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

