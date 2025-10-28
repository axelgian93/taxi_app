//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:openapi/src/model/payments_refunds_by_trip200_response_items_inner.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_refunds_by_trip200_response.g.dart';

/// PaymentsRefundsByTrip200Response
///
/// Properties:
/// * [items] 
@BuiltValue()
abstract class PaymentsRefundsByTrip200Response implements Built<PaymentsRefundsByTrip200Response, PaymentsRefundsByTrip200ResponseBuilder> {
  @BuiltValueField(wireName: r'items')
  BuiltList<PaymentsRefundsByTrip200ResponseItemsInner>? get items;

  PaymentsRefundsByTrip200Response._();

  factory PaymentsRefundsByTrip200Response([void updates(PaymentsRefundsByTrip200ResponseBuilder b)]) = _$PaymentsRefundsByTrip200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsRefundsByTrip200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsRefundsByTrip200Response> get serializer => _$PaymentsRefundsByTrip200ResponseSerializer();
}

class _$PaymentsRefundsByTrip200ResponseSerializer implements PrimitiveSerializer<PaymentsRefundsByTrip200Response> {
  @override
  final Iterable<Type> types = const [PaymentsRefundsByTrip200Response, _$PaymentsRefundsByTrip200Response];

  @override
  final String wireName = r'PaymentsRefundsByTrip200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsRefundsByTrip200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.items != null) {
      yield r'items';
      yield serializers.serialize(
        object.items,
        specifiedType: const FullType(BuiltList, [FullType(PaymentsRefundsByTrip200ResponseItemsInner)]),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    PaymentsRefundsByTrip200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsRefundsByTrip200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'items':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(PaymentsRefundsByTrip200ResponseItemsInner)]),
          ) as BuiltList<PaymentsRefundsByTrip200ResponseItemsInner>;
          result.items.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PaymentsRefundsByTrip200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsRefundsByTrip200ResponseBuilder();
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

