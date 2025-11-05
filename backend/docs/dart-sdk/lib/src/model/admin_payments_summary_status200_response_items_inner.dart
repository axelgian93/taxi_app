//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_payments_summary_status200_response_items_inner.g.dart';

/// AdminPaymentsSummaryStatus200ResponseItemsInner
///
/// Properties:
/// * [status] 
/// * [count] 
/// * [amountUsd] 
@BuiltValue()
abstract class AdminPaymentsSummaryStatus200ResponseItemsInner implements Built<AdminPaymentsSummaryStatus200ResponseItemsInner, AdminPaymentsSummaryStatus200ResponseItemsInnerBuilder> {
  @BuiltValueField(wireName: r'status')
  String? get status;

  @BuiltValueField(wireName: r'count')
  int? get count;

  @BuiltValueField(wireName: r'amountUsd')
  num? get amountUsd;

  AdminPaymentsSummaryStatus200ResponseItemsInner._();

  factory AdminPaymentsSummaryStatus200ResponseItemsInner([void updates(AdminPaymentsSummaryStatus200ResponseItemsInnerBuilder b)]) = _$AdminPaymentsSummaryStatus200ResponseItemsInner;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminPaymentsSummaryStatus200ResponseItemsInnerBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminPaymentsSummaryStatus200ResponseItemsInner> get serializer => _$AdminPaymentsSummaryStatus200ResponseItemsInnerSerializer();
}

class _$AdminPaymentsSummaryStatus200ResponseItemsInnerSerializer implements PrimitiveSerializer<AdminPaymentsSummaryStatus200ResponseItemsInner> {
  @override
  final Iterable<Type> types = const [AdminPaymentsSummaryStatus200ResponseItemsInner, _$AdminPaymentsSummaryStatus200ResponseItemsInner];

  @override
  final String wireName = r'AdminPaymentsSummaryStatus200ResponseItemsInner';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminPaymentsSummaryStatus200ResponseItemsInner object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.status != null) {
      yield r'status';
      yield serializers.serialize(
        object.status,
        specifiedType: const FullType(String),
      );
    }
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
    AdminPaymentsSummaryStatus200ResponseItemsInner object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminPaymentsSummaryStatus200ResponseItemsInnerBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.status = valueDes;
          break;
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
  AdminPaymentsSummaryStatus200ResponseItemsInner deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminPaymentsSummaryStatus200ResponseItemsInnerBuilder();
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

